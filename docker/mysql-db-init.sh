#!/bin/sh
# Runs once via Compose `db-init` to ensure DB + app user exist (idempotent).
# Root/app passwords may contain @, $, !, etc. — never pass them unquoted.

set -eu

MYSQL_HOST="${MYSQL_HOST:-mysql}"
DB_NAME="${MYSQL_DATABASE:-vuleits_db}"
DB_USER="${MYSQL_USER:-vuleits}"
DB_TRANSFER_MODE="${DB_TRANSFER_MODE:-off}"
DB_TRANSFER_FORCE="${DB_TRANSFER_FORCE:-0}"
DB_TRANSFER_SQL_PATH="${DB_TRANSFER_SQL_PATH:-/mysql-transfer/full.sql}"

if [ -z "${MYSQL_ROOT_PASSWORD:-}" ]; then
  echo "mysql-db-init: MYSQL_ROOT_PASSWORD is empty" >&2
  exit 1
fi
if [ -z "${MYSQL_PASSWORD:-}" ]; then
  echo "mysql-db-init: MYSQL_PASSWORD is empty" >&2
  exit 1
fi

# Escape single quotes in SQL string literals (' -> '')
sql_escape() {
  printf '%s' "$1" | sed "s/'/''/g"
}

PW_SQL=$(sql_escape "$MYSQL_PASSWORD")

wait_for_mysql() {
  i=1
  while [ "$i" -le 90 ]; do
    if mysqladmin ping -h "$MYSQL_HOST" -uroot -p"$MYSQL_ROOT_PASSWORD" --silent 2>/dev/null; then
      return 0
    fi
    echo "mysql-db-init: waiting for MySQL ($i/90)..."
    sleep 2
    i=$((i + 1))
  done
  echo "mysql-db-init: timed out waiting for MySQL at ${MYSQL_HOST}:3306" >&2
  exit 1
}

wait_for_mysql

mysql -h "$MYSQL_HOST" -uroot -p"$MYSQL_ROOT_PASSWORD" --protocol=TCP -e "
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${PW_SQL}';
ALTER USER '${DB_USER}'@'%' IDENTIFIED BY '${PW_SQL}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'%';
FLUSH PRIVILEGES;
"

should_import_full_transfer() {
  [ "$DB_TRANSFER_MODE" = "full" ] || return 1
  [ -f "$DB_TRANSFER_SQL_PATH" ] || return 1

  if [ "$DB_TRANSFER_FORCE" = "1" ] || [ "$DB_TRANSFER_FORCE" = "true" ]; then
    return 0
  fi

  TABLE_COUNT=$(
    mysql -N -B -h "$MYSQL_HOST" -uroot -p"$MYSQL_ROOT_PASSWORD" --protocol=TCP \
      -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='${DB_NAME}';"
  )
  [ "${TABLE_COUNT:-0}" -eq 0 ]
}

if should_import_full_transfer; then
  echo "mysql-db-init: importing full SQL transfer from ${DB_TRANSFER_SQL_PATH} ..."
  mysql -h "$MYSQL_HOST" -uroot -p"$MYSQL_ROOT_PASSWORD" --protocol=TCP < "$DB_TRANSFER_SQL_PATH"
  echo "mysql-db-init: full SQL transfer import completed."
elif [ "$DB_TRANSFER_MODE" = "full" ]; then
  if [ ! -f "$DB_TRANSFER_SQL_PATH" ]; then
    echo "mysql-db-init: DB_TRANSFER_MODE=full but SQL file not found at ${DB_TRANSFER_SQL_PATH} (skipping)." >&2
  else
    echo "mysql-db-init: DB_TRANSFER_MODE=full but DB is not empty; skipping import. Set DB_TRANSFER_FORCE=1 to overwrite." >&2
  fi
fi

echo "mysql-db-init: database and user ready."

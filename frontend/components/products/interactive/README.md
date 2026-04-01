# Interactive product cards

Flip-to-back cards on `/products`; after the flip (or immediately when **reduced motion** is on), navigation goes to **`/products/<slug>`**. Before navigation, the card image area’s **`getBoundingClientRect()`** is stored in **`sessionStorage`** (`productTransitionStorage.ts`). **`ProductDetailClient`** mounts a **fixed** shell that **springs** from that rect to the full viewport; **Back** or the breadcrumb **Products** control runs the **reverse** animation, then **`router.back()`**. Direct visits (no stored transition) use the normal static layout. The product layout still uses a Framer **`LayoutGroup`** for detail hero continuity on direct visits (listing cards no longer use a shared `layoutId`, to avoid compositing glitches with the 3D flip).

## Files

| File | Role |
|------|------|
| `types.ts` | `InteractiveProduct`, `PRODUCT_HERO_LAYOUT_ID` |
| `productTransitionStorage.ts` | Read/write card bounds for enter/exit shell animation |
| `ProductCard.tsx` | Flip (`rotateY`), plain hero `<img>` (no `layoutId`), action row with `stopPropagation`, `router.push` to `/products/[slug]` |
| `ProductList.tsx` | Memoized grid of `ProductCard` |

## Integration (App Router)

1. **`app/products/layout.tsx`** should wrap children with **`ProductsLayoutGroup`** (see `app/products/ProductsLayoutGroup.tsx`) inside your public shell so listing and detail share one **`LayoutGroup`**.
2. Use **`ProductList`** on the listing page; **`ProductCard`** does not require any provider.
3. **Deep links** use **`/products/<slug>`** only. The old query overlay **`?p=`** is not used.

## Routes: slug vs id

The app uses **`/products/[slug]`** everywhere. Action links (**View demo**, **Landing**) are normal **`next/link`** targets to that route (open the product via flip / reduced motion, not a separate details button).

## Accessibility

- **Card flip region**: `role="button"`, `tabIndex={0}`, `aria-expanded` tied to flip state, keyboard **Enter / Space** to flip.
- **Reduced motion**: `useReducedMotion()` skips the flip and navigates in one step.
- **Action buttons**: `stopPropagation` so they do not trigger flip; links remain real `<a>` for middle-click and accessibility.

## Performance

- `ProductCard` and `ProductList` are wrapped in **`React.memo`**.
- Product images use **`loading="lazy"`** and **`decoding="async"`** on cards; detail hero uses **`loading="eager"`**.

## Dependency

- **`framer-motion`** (repo root / workspace).

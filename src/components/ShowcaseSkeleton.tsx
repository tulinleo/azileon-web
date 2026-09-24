/* What the 3D showcase's box shows before the scene is on screen: a faint shimmer across the card and three quiet
   dots. Kept in its own tiny file so the Suspense fallback does not pull in three.js. */
export default function ShowcaseSkeleton() {
  return (
    <div className="showcase-skeleton" aria-hidden="true">
      <span className="showcase-skeleton-dots">
        <i />
        <i />
        <i />
      </span>
    </div>
  )
}

Drop founder photos here, then point each founder's `photo` field at them
in app/(marketing)/page.tsx (the FOUNDERS array near the top).

  public/founders/wallace.jpg     ->  photo: "/founders/wallace.jpg"
  public/founders/cofounder.jpg   ->  photo: "/founders/cofounder.jpg"

Best results: a portrait-orientation photo (taller than wide, roughly 4:5),
at least 800px on the short side. Until a photo is set, a clean initials tile
shows in its place, so nothing ever looks broken.

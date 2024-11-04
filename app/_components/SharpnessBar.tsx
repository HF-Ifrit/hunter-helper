export default function SharpnessBar({
  sharpness,
}: {
  sharpness: WeaponSharpness;
}) {
  // Sharpness formula: https://docs.mhw-db.com/#weapon-sharpness
  const generateBar = (color: keyof WeaponSharpness): JSX.Element => {
    const barWidth = Math.floor((sharpness[color] / 400) * 100);
    return (
      <div
        className="h-4 w-full"
        style={{ width: `${barWidth}%`, backgroundColor: `${color}` }}
      />
    );
  };

  return (
    <>
      <div className="flex w-96 border-black bg-gray-600 border-2 rounded-lg p-1 overflow-auto items-center">
        {Object.keys(sharpness).map((item: string) =>
          generateBar(item as keyof WeaponSharpness)
        )}
      </div>
    </>
  );
}

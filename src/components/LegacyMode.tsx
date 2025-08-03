"use client";

type LegacyModeProps = {
  creatorName: string;
  friendName: string;
};

export default function LegacyMode({ creatorName, friendName }: LegacyModeProps) {
  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-gray-900 p-8 text-center shadow-2xl border-4 border-double border-gray-600">
      <h2 className="text-3xl font-serif font-bold text-gray-300">
        In Questionable Memory
      </h2>

      <div className="my-6 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-500">
            <span className="text-5xl text-gray-400">?</span>
        </div>
      </div>

      <h3 className="text-2xl font-serif text-gray-200">The Friendship of</h3>
      <p className="my-2 text-xl font-semibold text-gray-400">
        {creatorName} & {friendName}
      </p>

      <p className="text-sm text-gray-500 font-serif">
        Est. Confusion - {new Date().getFullYear()}
      </p>

      <div className="mt-6 border-t border-gray-700 pt-4 text-left text-base text-gray-400">
        <p>
          It is with a profound sense of... something... that we acknowledge the end of an era. The friendship, known for its chaotic energy and mutual trolling, has ceased to be. It is survived by a string of awkward memories and at least one shared Netflix password that should probably be changed.
        </p>
        <p className="mt-4 italic">
          It will be missed. Maybe.
        </p>
      </div>
    </div>
  );
}
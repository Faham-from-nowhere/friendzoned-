"use client";

// Define the roast levels and their corresponding data
const certificateData = {
  Mild: {
    title: "Official Frenemy",
    stats: ["✅ Tolerates your terrible jokes", "✅ Hasn't unfollowed you... yet", "✅ Knows your Wi-Fi password"],
  },
  Medium: {
    title: "Partner in Questionable Choices",
    stats: ["✅ Unpaid emotional support human", "✅ Knows too many of your secrets", "✅ Has seen you ugly-cry"],
  },
  Nuclear: {
    title: "Certified Emotional Baggage Handler",
    stats: ["✅ Has witnessed your 3 AM meltdowns", "✅ Should probably be sainted (or sectioned)", "✅ Co-signer on your life's bad decisions"],
  },
};

type RoastLevel = keyof typeof certificateData;

type CertificateProps = {
  creatorName: string;
  friendName: string;
  roastLevel?: RoastLevel; // Accept the roastLevel prop
};

export default function FriendshipCertificate({ creatorName, friendName, roastLevel = "Mild" }: CertificateProps) {
  // Select the data based on the prop, defaulting to Mild
  const currentData = certificateData[roastLevel] || certificateData.Mild;
  
  return (
    <div className="mt-8 w-full max-w-md rounded-lg border-4 border-dashed border-yellow-500 bg-yellow-50 p-6 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-800" style={{ fontFamily: 'serif' }}>
        {currentData.title}
      </h2>
      <p className="mt-4 text-gray-600">This certificate is reluctantly presented to</p>
      <p className="my-4 text-4xl font-bold text-yellow-700">
        {friendName}
      </p>
      <p className="text-gray-600">
        For somehow still being friends with <span className="font-semibold">{creatorName}</span>.
      </p>
      <div className="mt-6 border-t border-gray-300 pt-4 text-left text-sm text-gray-700">
        <h4 className="mb-2 text-center font-bold">Questionable Achievements:</h4>
        <ul className="list-inside list-disc">
          {currentData.stats.map(stat => <li key={stat}>{stat}</li>)}
        </ul>
      </div>
      <div className="mt-4 text-5xl">🏅</div>
    </div>
  );
}
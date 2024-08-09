import StatForm from "./_components/stat-form";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          Welcome to the <span className="text-blue-500">Statistical Basketball Chatbot</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Or SBC for short!
        </p>
        <div className="mt-10">
          <StatForm />
        </div>
      </div>
    </main>
  );
}

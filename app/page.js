import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Geanu's Expensify App</h1>
        <div className="bg-slate-800 p-4 rounded-sm">
          <form action="grid grid-cols-6 items-center text-black">
            <input type="text" className="col-span-3 p-3 border" placeholder="Enter Item" />
            <input type="number" className="col-span-2 p-3 border mx-3" placeholder="Enter $" />
            <button type="submit" className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl">+</button>
          </form>
        </div>
      </div>
    </main>
  );
}

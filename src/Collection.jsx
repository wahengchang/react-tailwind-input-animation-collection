import Test1 from './Test1';
import Test2 from './Test2';

export default function Collection() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <Test1 />
        <Test2 />
      </div>
    </div>
  );
}

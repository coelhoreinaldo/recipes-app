import rockGlass from '../assets/rockGlass.svg';

export default function Loading() {
  return (
    <div
      role="status"
      data-testid="loading"
      className="w-full h-screen flex items-center
      justify-center bg-black bg-opacity-60 z-40"
    >
      <img src={ rockGlass } alt="Loading" className="animate-ping h-36 w-36 -mt-14 " />
    </div>
  );
}

import rockGlass from '../images/rockGlass.svg';

export default function Loading() {
  return (
    <div
      role="status"
      data-testid="loading"
      className="w-full h-screen -mt-16 flex items-center justify-center"
    >
      <img src={ rockGlass } alt="Loading" className="animate-ping h-36 w-36" />
    </div>
  );
}

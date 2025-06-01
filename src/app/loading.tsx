import Loading from '@/components/loading';

export default function AppLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loading size="lg" text="Cargando aplicación..." />
    </div>
  );
}

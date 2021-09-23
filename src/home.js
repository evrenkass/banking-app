import { Card } from "./Card";

export function Home() {
  return (
    <Card header="Dreambank Landing Module" className="text-center">
      <p className="mt-4">Welcome to your online banking page</p>
      <p>You can move around using the navigation bar</p>
      <img src="bank.png" className="img-fluid w-50" alt="" />
    </Card>
  );
}

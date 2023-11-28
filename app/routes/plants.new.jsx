import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import BasicButton from "../components/basicButton";

export async function action({ request }) {
  const body = await request.formData();
  console.log(body);

  return redirect("/plants");
}

export default function NewPlant() {
  return (
    <main>
      <h1>Add a New Plant</h1>
      <Form>
        <div className="flex flex-col mt-20">
          <label htmlFor="new_plant"> common name</label>
          <input
            type="text"
            placeholder="plant name"
            id="new_plant"
            name="plant_name"
          />
        </div>
        <input type="file" />
        <BasicButton label="upload photo" />
      </Form>
    </main>
  );
}

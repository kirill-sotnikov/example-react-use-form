import { nanoid } from "nanoid";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Item } from "../components/Item";

interface FormDataType extends FieldValues {
  content: Record<string, string>;
}

export const MainPage = () => {
  const [isEdit, setIsEdit] = useState(true);
  const form = useForm<FormDataType>();
  const content = form.watch("content");
  const { register, handleSubmit, formState, setValue, reset } = form;

  if (isEdit) {
    return (
      <FormProvider {...form}>
        <form
          action="submit"
          onSubmit={handleSubmit((data: FormDataType) => {
            setValue("content", data.content);
            setIsEdit(false);
          })}
        >
          {content &&
            Object.entries(content).map((item) => (
              <Item isEdit={true} value={item[1]} id={item[0]} key={item[0]} />
            ))}
          <button type="submit">submit</button>
          <button
            type="button"
            onClick={() => {
              const newObject = {};
              newObject[nanoid()] = "new";
              setValue(`content`, { ...newObject, ...content });
            }}
          >
            add
          </button>
        </form>
      </FormProvider>
    );
  }

  return (
    <>
      <FormProvider {...form}>
        <button onClick={() => setIsEdit(true)}>edit</button>
        {content &&
          Object.entries(content).map((item) => (
            <Item isEdit={false} value={item[1]} key={item[0]} />
          ))}
      </FormProvider>
    </>
  );
};

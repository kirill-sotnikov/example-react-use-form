import { memo } from "react";
import { useFormContext } from "react-hook-form";

interface ItemProps {
  isEdit: boolean;
  value: string;
  id?: string;
}

export const Item = memo<ItemProps>(({ isEdit, value, id }) => {
  const { register } = useFormContext();

  if (isEdit) {
    return (
      <p>
        <input
          defaultValue={value}
          {...register(`content.${id}`)}
          type="text"
        />
      </p>
    );
  }

  return <p>{value}</p>;
});

/**
 *
 * {
 *   asdmkm123klmad: 'value'
 * }
 */

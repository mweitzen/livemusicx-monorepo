import { useFieldArray, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export const SelectGenres = () => {
  const { register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "genres" });
  return (
    <div>
      <Label>Genres</Label>
      <div className="flex gap-2">
        {fields.length ? (
          fields.map((field, index) => (
            <Badge
              key={field.id}
              variant="outline"
              className="flex items-center gap-1 pr-1 hover:cursor-pointer hover:bg-secondary"
              onClick={() => remove(index)}
            >
              {getValues(`genres.${index}.id`)} <XMarkIcon className="h-3 w-3" />
              <input hidden {...register(`genres.${index}.id`)} />
            </Badge>
          ))
        ) : (
          <Badge variant="outline">No Genres Selected</Badge>
        )}
      </div>
      <div className="flex gap-4 py-2">
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={() => append({ id: "BLUES" })}
        >
          Blues
        </Button>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={() => append({ id: "ROCK" })}
        >
          Rock
        </Button>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={() => append({ id: "SHIT" })}
        >
          Shit
        </Button>
      </div>
    </div>
  );
};

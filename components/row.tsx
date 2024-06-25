"use client";

import { useState } from "react";
import { HiCheck, HiOutlinePencil, HiX } from "react-icons/hi";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";

export const isValid = (input: any) => {
  return !isNaN(input) && input > 0 && input < 2000;
}

export function Row({ 
  v, 
  index,
  levels,
  setLevels
} : { 
  v: number; 
  index:number; 
  levels: number[];
  setLevels: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [updating, setUpdating] = useState<boolean>(false);
  const [value, setValue] = useState<number | string>(v);
  
  const updateLevel = (index: number, value: number) => {
    setLevels((prev) => {
      const temp = [...prev];
      if (isValid(value)) {
        temp[index] = value;
      }
      return temp;
    });
  }
  
  const removeLevel = (index: number) => {
    setLevels((prev) => prev.filter((v, i) => i !== index));
  }

  return (
    <div key={index} className="flex justify-between gap-2">
      <Input
        className="flex-1 disabled:border-none  hide-spin-button"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value ? Number(e.currentTarget.value) : '')}
        disabled={!updating} 
        type="number"
        inputMode="numeric"
        autoFocus
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button 
            className="text-xs"
            variant="ghost"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          {updating ? (
            <>
            <DropdownMenuItem
              onClick={() => {
                updateLevel(index, Number(value));
                setUpdating(false);
              }}
            >
              Save
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setValue(v);
                setUpdating(false);
              }}
            >
              Cancel
            </DropdownMenuItem>
            </>
          ) : (
            <>
            <DropdownMenuItem
              onClick={() => setUpdating(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => removeLevel(index)}
            >
              Delete
            </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
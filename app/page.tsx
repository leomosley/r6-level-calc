"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiCheck, HiOutlinePencil, HiOutlinePencilAlt, HiPlus, HiTrash, HiX } from "react-icons/hi";
import { cn, getTotal } from "@/lib/utils";

export default function Home() {
  const [levels, setLevels] = useState<number[]>([]);
  const [total, setTotal] = useState<{ level: number; xp: number} | undefined>()
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = (input: any) => {
    return !isNaN(input) && input > 0 && input < 2000;
  }

  const addLevel = () => {
    if (inputRef.current) {
      const value = inputRef.current.valueAsNumber;
      if (isValid(value)) {
        setLevels(prev => [ ...prev, value ]);
      }
      inputRef.current.value = '';
    }
  };

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

  const LevelRow = ({ v, index } : { v: number; index:number }) => {
    const [updating, setUpdating] = useState<boolean>(false);
    const [value, setValue] = useState<number | string>(v);

    return (
      <div key={index} className="flex gap-2 border-t border-t-neutral-800">
        <input 
          className="flex-1 p-2 pl-0 w-5 outline-none bg-transparent hide-spin-button disabled:text-gray-200"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value ? Number(e.currentTarget.value) : '')}
          disabled={!updating} 
          type="number"
          inputMode="numeric"
          autoFocus
        />
        <div className="flex flex-1 gap-2 items-center">
          <button
            className=""
            onClick={() => {
              updating && updateLevel(index, Number(value));
              setUpdating(prev => !prev);
            }}
          >
            {updating
              ? <HiCheck className="w-5 h-5" />
              : <HiOutlinePencil className="w-5 h-5" />
            } 
          </button>
          <button
            className=""
            onClick={() => removeLevel(index)}
          >
            <HiX className="w-5 h-5"/>
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setTotal(getTotal(levels));
  }, [levels]);
  
  return (
    <main className="flex flex-col mx-auto p-4 min-h-dvh sm:min-h-[300px] md:min-h-[400px] lg:min-h-[550px] md:max-w-4xl">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tighter text-balance p-2 pl-0 mt-5">
          Calculate Your Total Level
        </h1>
        {levels.map((value, index) => (
          <LevelRow 
            key={index}
            v={value}
            index={index}
          />
        ))}
        <div className="flex gap-2 border-y border-y-neutral-800 mb-4">
          <span className="flex-1 p-2 pl-0">Total Level {total && total.level}</span>
          <span className="flex-1 p-2 pl-0">Total XP {total && total.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
      </div>
      <div className={cn(
        "flex items-center mx-auto mt-auto",
        "px-4 py-2 bg-neutral-900 gap-2 rounded-full"
      )}>
        <input 
          ref={inputRef}
          className="bg-transparent outline-none hide-spin-button"
          autoFocus
          type="number"
          inputMode="numeric"
          placeholder="Enter level"
        />
        <button
          className={cn(
            "p-1 rounded-full transition",
            "hover:bg-neutral-800 cursor-pointer",
          )}
          onClick={addLevel}
        >
          <HiPlus className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}

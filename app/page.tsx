"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiCheck, HiOutlinePencil, HiOutlinePencilAlt, HiPlus, HiTrash, HiX } from "react-icons/hi";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { cn, getTotal } from "@/lib/utils";
import { isValid, Row } from "@/components/row";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { BsGithub } from "react-icons/bs";

export default function Home() {
  const [storedLevels, setStoredLevels] = useLocalStorage<number[]>("levels", []);
  const [levels, setLevels] = useState<number[]>(storedLevels);
  const [total, setTotal] = useState<{ level: number; xp: number} | undefined>()
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.key === 'Enter' && addLevel();
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

  useEffect(() => {
    setTotal(getTotal(levels));
    setStoredLevels(levels);
  }, [levels]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <main className="flex flex-col mx-auto p-4 min-h-dvh md:max-w-4xl">
      <div className="flex mt-4 sm:mt-10">
        <Label className="text-3xl sm:text-4xl font-semibold tracking-tighter">R6 Level Calculator</Label>
        <Button
          variant="ghost"
          className="ml-auto p-2 my-auto"
        >
          <a target="_blank" href="https://github.com/leomosley/r6-level-calc">
            <BsGithub className="w-5 h-5" />
          </a>
        </Button>
      </div>
      <Label className="font-normal text-sm mb-2">Enter each of your accounts level to find out your combined stats.</Label>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center gap-2">
          <div className="flex-1">
            {/* Select all checbox + usernamec column needed */}
            <Button
              variant={"ghost"}
              // onClick sort
            >
              Level
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {levels.length > 0 ? (levels.map((value, index) => (
            <Row
              key={index}
              v={value}
              index={index}
              levels={levels}
              setLevels={setLevels}
            />
          ))) : (
            <div>Start adding levels...</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-end">
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              onClick={() => setLevels([])}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-col w-full sm:w-auto min-w-64">
            <Label>Combined Stats</Label>
            <div className="flex gap-2">
              <span className="flex-1 text-sm p-2 pl-0">Level {total && total.level}</span>
              <span className="flex-1 text-sm p-2 pl-0">XP {total && total.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
          </div>
        </CardFooter> 
      </Card>
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

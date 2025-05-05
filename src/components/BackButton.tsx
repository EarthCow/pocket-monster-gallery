'use client';
import {useRouter} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
      <Button onClick={router.back} variant={"link"} className="justify-start hover:cursor-pointer hover:[&_svg]:-translate-x-1 [&_svg]:transition">
        <ArrowLeft /> back to gallery
      </Button>
  );
}
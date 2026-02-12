import  Button  from "@/components/demobutton";
import { Mail } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LeaderCardProps = {
  name: string;
  position: string;
  description: string;
  email: string;
  imgurl: string;
};

export default function LeaderCard({
  name,
  position,
  description,
  email,
  imgurl,
}: LeaderCardProps) {
  return (
    <Card className="relative w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={imgurl}
        alt={`${name}'s photo`}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{`${name} - ${position}`}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2"
          >
            <Mail />
            Contact
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
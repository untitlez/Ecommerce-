"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Search } from "lucide-react";

import { Routes } from "@/lib/routes";
import { RoomType } from "@/validators/room.validator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Endpoints } from "@/lib/endpoints";
import { Config } from "@/lib/config";
import { toast } from "sonner";

const tableHeader = [
  "Room Number",
  "Image",
  "Location",
  "Room Type",
  "Description",
  "Price",
];

interface DashboardRoomTableProps {
  data: RoomType[];
}

export const DashboardRoomTable = ({ data }: DashboardRoomTableProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [rooms, setRooms] = useState<RoomType[]>(data);

  const onSearch = async () => {
    try {
      const { data } = await axios.get(Config.API_URL + Endpoints.rooms, {
        params: { search: searchInput },
      });
      setRooms(data);
      toast.info(`Found ${data.length} results for "${searchInput}"`);
    } catch (error: unknown) {
      console.error("Error", error);
      toast.warning("Search failed. Please try again.");
    }
  };

  const router = useRouter();
  const handleView = (id: string) => {
    router.push(Routes.dashboard.room + id);
  };

  return (
    <div className="space-y-4 my-2">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          <Input
            className="w-100 pl-8"
            placeholder="Search the table..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Button asChild>
          <Link href={Routes.dashboard.createRoom}>Create Room</Link>
        </Button>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-muted">
            {tableHeader.map((item, i) => (
              <TableHead key={i}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((item, i) => (
            <TableRow
              key={i}
              onClick={() => handleView(item.id)}
              className="cursor-pointer"
            >
              <TableCell>{item.roomNumber}</TableCell>
              <TableCell>Image.jpg</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.pricePerNight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

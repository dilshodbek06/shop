import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="flex gap-1 items-center">
      <Input placeholder="search" />
      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchForm;

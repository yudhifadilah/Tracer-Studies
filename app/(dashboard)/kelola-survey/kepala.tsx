import React from "react";
import {Breead} from "@/components/bread"


export const Kepala: React.FC = () => {

return (
<div className="h-full lg:px-6">
<div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
  <div className="mt-0 gap-6 flex flex-col w-full">
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">You are Here</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
      <Breead />
      </div>
    </div>   
</div>
</div>
</div>
)
};

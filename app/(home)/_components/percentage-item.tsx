import { ReactNode } from "react";

interface IPercentageItemProps {
   icon: ReactNode;
   type: string;
   percentage: number;
}

const PercentageItem = ({ icon, type, percentage }: IPercentageItemProps) => {
   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            {icon}
            <p className="text-sm text-muted-foreground">{type}</p>
         </div>

         <p className="text-sm font-bold">{percentage}%</p>
      </div>
   );
};

export default PercentageItem;

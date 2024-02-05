import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  value: string | number | ReactNode;
  icon: ReactNode;
  color: string;
}

function InfoCard({ title, value, icon, color }: InfoCardProps) {
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {title}
              </h5>
              <span className="font-bold text-xl">{value}</span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                {icon}
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-500 mt-4">
            <span className="text-emerald-500 mr-2">
              <i className="fas fa-arrow-up"></i> 3.48%
            </span>
            <span className="whitespace-nowrap">Since last month</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

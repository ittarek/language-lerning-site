// Experience Item Component
export const ExperienceItem = ({ year, title, details, index }) => (
  <>

    <div className="mt-8 relative">
      {/* Timeline Line */}
      <div className="absolute left-[42px] w-0.5 top-0 h-full bg-gradient-to-t from-transparent to-[#516acc]" />

      {/* Timeline Items */}
      <div className="relative pl-[60px] pr-5 pb-8 z-10">
        <div className="absolute top-0 left-[37px] w-2 h-2 border-2 border-white rounded-full bg-gradient-to-b from-[#a0aee3] to-[#516acc]">
          <span className="absolute text-[11px] text-gray-500/70 -left-9 top-0">
            {year}
          </span>
        </div>
        <div className="font-medium text-[14px] mb-1.5">{title}</div>
        <div className="text-[13px] text-gray-600 leading-relaxed">{details}</div>
      </div>
    </div>
  </>
);

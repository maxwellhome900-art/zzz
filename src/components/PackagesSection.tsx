import { packages } from "../config/packages";
import { PackageCard } from "./PackageCard";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function PackagesSection() {
  return (
    <section id="packages" className="scroll-mt-24 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Packages"
            title="The sessions"
            description="Four ways to be photographed in New York. Sessions begin in Times Square unless the package includes more of the city."
          />
        </Reveal>
        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((photoPackage, index) => (
            <Reveal key={photoPackage.id} delay={index * 0.06} className="h-full">
              <PackageCard photoPackage={photoPackage} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

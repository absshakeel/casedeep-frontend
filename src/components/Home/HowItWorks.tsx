import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ComponentWrapper styles="pt-6 mt-6 csm:pt-8">
      <div id="how-it-works" className="w-full flex justify-center items-center">
        <div className="flex lg:max-w-full max-w-[700px] flex-col gap-6 md:gap-10">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <img 
              src="/inviting-arrow.svg" 
              alt={t('howItWorks.arrowAlt')} 
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
            />
            <p className="text-[24px] text-center md:text-left sm:text-[30px] md:text-[36px] lg:text-[40px] font-zen font-normal text-[#eeeeee]">
              {t('howItWorks.title')}
            </p>
          </div>
          
          {/* Section 1 */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr,1fr]">
            <div className="w-full flex flex-col px-7 sm:px-16 lg:px-28 py-5 rounded-tl-[60px] sm:rounded-tl-[110px] rounded-bl-[60px] sm:rounded-bl-[100px] rounded-br-[100px] rounded-tr-[0px] gap-1"
              style={{
                backgroundImage: "linear-gradient(to bottom, rgba(76, 76, 76, 0.5), rgba(37, 37, 37, 0.5))",
                backgroundSize: "cover",
              }}>
              <p className="text-cyan-1 font-medium font-pingfang">
                {t('howItWorks.section1.title')}
              </p>
              <p className="text-[16px] text-[#999999] font-pingfang">
                {t('howItWorks.section1.description')}
              </p>
            </div>
            <div className="w-full -ml-[5rem] lg:flex hidden -mt-[2rem] justify-center items-center min-h-[220px]"
              style={{
                backgroundImage: "url('/element-blue.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize:'contain',
              }}>
              <img
                src="/img-patient-attorney.png"
                className="w-[200px] -mr-5 -mt-2 h-[200px]"
                alt={t('howItWorks.section1.imageAlt')}
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="w-full mt-0 lg:mt-6 grid grid-cols-1 lg:grid-cols-[1fr,1.5fr]">
            <div className="w-full lg:flex hidden justify-center items-center min-h-[220px]"
              style={{
                backgroundImage: "url('/element-orange.svg')",
                backgroundRepeat: "no-repeat",
              }}>
              <img
                src="/img-engineer.png"
                className="w-[240px] ml-20 -mt-5 h-[180px]"
                alt={t('howItWorks.section2.imageAlt')}
              />
            </div>
            <div className="w-full mt-0 lg:-mt-[2rem] ml-0 lg:-ml-[5rem]">
              <div className="w-full flex flex-col px-7 sm:px-16 lg:px-28 py-5 rounded-tl-[60px] rounded-br-[60px] sm:rounded-br-[110px] rounded-bl-[60px] sm:rounded-bl-[110px] sm:rounded-tl-[110px] rounded-tr-[0px] sm:rounded-tr-[110px] gap-1"
                style={{
                  backgroundImage: "linear-gradient(to bottom, rgba(76, 76, 76, 0.5), rgba(37, 37, 37, 0.5))",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}>
                <p className="text-orange-1 font-medium font-pingfang">
                  {t('howItWorks.section2.title')}
                </p>
                <p className="text-[16px] text-[#999999] font-pingfang">
                  {t('howItWorks.section2.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr,1fr]">
            <div className="w-full flex flex-col px-7 sm:px-16 lg:px-28 py-5 rounded-tl-[60px] sm:rounded-tl-[110px] rounded-bl-[60px] sm:rounded-bl-[100px] rounded-br-[100px] rounded-tr-[0px] gap-1"
              style={{
                backgroundImage: "linear-gradient(to bottom, rgba(76, 76, 76, 0.5), rgba(37, 37, 37, 0.5))",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}>
              <p className="text-[#cc66ff] font-medium font-pingfang">
                {t('howItWorks.section3.title')}
              </p>
              <p className="text-[16px] text-[#999999] font-pingfang">
                {t('howItWorks.section3.description')}
              </p>
            </div>
            <div className="w-full -ml-[5rem] -mt-[2rem] hidden lg:flex justify-center items-center min-h-[220px]"
              style={{
                backgroundImage: "url('/element-purple.svg')",
                backgroundRepeat: "no-repeat",
              }}>
              <img
                src="/img-shooting.png"
                className="w-[200px] h-[200px]"
                alt={t('howItWorks.section3.imageAlt')}
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="w-full mt-0 lg:mt-6 grid grid-cols-1 lg:grid-cols-[1fr,1.5fr]">
            <div className="w-full hidden lg:flex justify-center items-center min-h-[220px]"
              style={{
                backgroundImage: "url('/element-green.svg')",
                backgroundRepeat: "no-repeat",
              }}>
              <img
                src="/img-data-analyst.png"
                className="w-[200px] -ml-5 -mt-5 h-[200px]"
                alt={t('howItWorks.section4.imageAlt')}
              />
            </div>
            <div className="w-full mt-0 lg:-mt-[2rem] ml-0 lg:-ml-[5rem]">
              <div className="w-full flex flex-col px-7 sm:px-16 lg:px-28 py-5 rounded-tl-[60px] rounded-br-[60px] sm:rounded-br-[110px] rounded-bl-[60px] sm:rounded-bl-[110px] sm:rounded-tl-[110px] rounded-tr-[0px] sm:rounded-tr-[110px] gap-1"
                style={{
                  backgroundImage: "linear-gradient(to bottom, rgba(76, 76, 76, 0.5), rgba(37, 37, 37, 0.5))",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}>
                <p className="text-[#80dd00] font-medium font-pingfang">
                  {t('howItWorks.section4.title')}
                </p>
                <p className="text-[16px] text-[#999999] font-pingfang">
                  {t('howItWorks.section4.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default HowItWorks;

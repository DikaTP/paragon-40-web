"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const schedules = ["07.30 WIB", "08.30 WITA & MYT", "09.30 WIT"];
const goods = ["Work ID", "Book", "Paper"];

export default function MainEventPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
          <h1 className="text-lg lg:text-7xl font-bold">{t('MainEventPage.title')}</h1>
          </div>
          <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col justify-between col-span-full lg:col-span-1">
            <div className="flex flex-col gap-3 mb-8">
              <span className="font-medium text-6xl max-w-xs">
                  COMING SOON
                </span>
              <span className="font-semibold text-base">
                  See you on February 28th, 2025 !
                </span>
              </div>
              <div className="flex flex-col gap-3">
              <span className="font-semibold text-base">
                  Offline in each Work Area
                </span>
              <div className="flex flex-row gap-4 items-center flex-wrap">
                  {schedules.map((item, index) => (
                    <div
                    className="flex border border-white py-1 px-3 rounded-full text-nowrap"
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          <div className="rounded-2xl col-span-full lg:col-span-1">
              <Image
                src={"/kita-sekarang-karena-kita-kemarin.png"}
                alt="Kita Sekarang Karena Kita Kemarin"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="px-16 max-w-screen-2xl mx-auto">
          <div className="flex flex-row bg-white/20 border border-white/30 rounded-3xl p-16 mt-10 shadow-2xl bg-gradient-to-r from-sky-300 to-fuchsia-300 shadow-sky-100/30 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="font-medium text-6xl max-w-xs text-white">
                  LOCATION
                </span>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63463.69558925956!2d106.77244144095891!3d-6.200100378984793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f60a22d8558b%3A0x2e4365a8c946e4e1!2sGrand%20Paragon%20XXI!5e0!3m2!1sid!2sid!4v1739540545005!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                  className="rounded-3xl"
                />
              </div>
            </div>
            <div className="flex flex-col justify-around w-full items-center">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-5">
                  <Image src={"/xxi.png"} alt="XXI" width={95} height={95} />
                  <Image src={"/cgv.png"} alt="XXI" width={100} height={100} />
                </div>
                <span className="font-semibold text-base text-white">
                  Will be located on your nearest Work Area
                </span>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <button className="flex flex-row gap-1 justify-center items-center rounded-full py-3 px-4 bg-purple-600 text-white text-sm">
      
                  Open Maps
                </button>
                <button className="flex flex-row gap-1 justify-center items-center rounded-full py-3 px-4 bg-orange-600 text-white text-sm">
      
                  Watch Livestream
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Do n Dont's */}
        <div className="px-16 max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-10 justify-between bg-white/20 border border-white/30 rounded-3xl p-16 mt-10 shadow-2xl bg-gradient-to-r from-sky-300 to-fuchsia-300 shadow-sky-100/30 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-3">
                <h3 className="text-5xl text-white">Do</h3>
                <div className="grid grid-cols-2 gap-28">
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <div className="bg-gray-300 w-14 h-14"></div>
                        <span className="text-white">Do {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-5xl text-white">Dont's</h3>
                <div className="grid grid-cols-2 gap-28">
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <div className="bg-gray-300 w-14 h-14"></div>
                        <span className="text-white">Do {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-base text-white">
                What to bring
              </span>
              <div className="flex flex-row gap-3 items-center">
                {goods.map((item, index) => (
                  <div
                    className="flex border border-white py-1 px-3 rounded-full text-white"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Timeline */}
        <div className="px-16 max-w-screen-2xl mx-auto text-white">
          <div className="flex flex-col w-full bg-white/20 border border-white/30 rounded-3xl p-16 mt-10 shadow-2xl bg-gradient-to-r from-sky-300 to-fuchsia-300 shadow-sky-100/30 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <span className="font-medium text-6xl max-w-xs text-white">
              TIMELINE
            </span>

            <div className="w-full flex flex-col">
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event:</p>
                    <p className="text-base">Festival Paragonian Talks</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 14th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                  <p>HO (P9), Plant (J6), All DC</p>
                </div>
              </div>
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event: Festival</p>
                    <p className="text-base">Paragonian Talks (Malaysia)</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(08.30-09.30 WIB)</p>
                  <p>Malaysia</p>
                </div>
              </div>
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event:</p>
                    <p className="text-base">Inauguration of Paragon HQ</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(08.30-09.30 WIB)</p>
                  <p>Ciledug Office</p>
                </div>
              </div>
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Main Event</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 28th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                  <p>Movie theaters in every branch area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

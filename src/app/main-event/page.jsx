"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const schedules = ["07.30 WIB", "08.30 WITA & MYT", "09.30 WIT"];

export default function MainEventPage() {
  const t = useTranslations();

  return (
    <div className="flex grow flex-col items-center">
      <div className="w-full">
        {/* TITLE */}
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-16">
          <div>
            <h1 className="text-7xl font-bold">{t("MainEventPage.title")}</h1>
          </div>
          <div>
            <Image
              src="/game-on-logo.png"
              alt="logo"
              width={200}
              height={128}
            />
          </div>
        </div>
        {/* COMING SOON */}
        <div className="px-16 max-w-screen-2xl mx-auto">
          <div className="flex flex-row justify-between bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-16 mt-10 shadow-2xl bg-gradient-to-r from-sky-300 to-fuchsia-300 shadow-sky-100/30">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-3">
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
                <div className="flex flex-row gap-3 items-center">
                  {schedules.map((item, index) => (
                    <div
                      className="flex border border-white py-1 px-3 rounded-full"
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl">
              <Image
                src={"/kita-sekarang-karena-kita-kemarin.png"}
                alt="Kita Sekarang Karena Kita Kemarin"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

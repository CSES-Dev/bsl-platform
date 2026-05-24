"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { geoAlbersUsa } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import type { Leader } from "@/data/leaders";

const BLUE = "#38BFE8";
const LIGHT_BLUE = "#C9F1FB";
const RED = "#E53935";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MAP_WIDTH = 800;
const MAP_HEIGHT = 500;
const MAP_SCALE = 1000;

const projection = geoAlbersUsa()
  .scale(MAP_SCALE)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

export default function LeadersMap({
  leaders,
  onSelectLeader,
}: {
  leaders: Leader[];
  onSelectLeader?: (leader: Leader) => void;
}) {
  const [active, setActive] = useState<Leader | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(MAP_WIDTH);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? MAP_WIDTH;
      setContainerWidth(w);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const tooltipPos = active ? projectToContainer(active.coordinates) : null;

  function projectToContainer(coords: [number, number]) {
    const projected = projection(coords);
    if (!projected) return null;
    const scaleRatio = containerWidth / MAP_WIDTH;
    return {
      left: projected[0] * scaleRatio,
      top: projected[1] * scaleRatio,
    };
  }

  return (
    <div className="mx-auto max-w-[1080px]">
      <div ref={containerRef} className="relative w-full">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: MAP_SCALE }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={LIGHT_BLUE}
                  stroke={BLUE}
                  strokeWidth={0.75}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: LIGHT_BLUE },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {leaders.map((leader) => {
            const isActive = active?.name === leader.name;
            const scale = isActive ? 1.25 : 1;
            return (
              <Marker
                key={leader.name}
                coordinates={leader.coordinates}
                onMouseEnter={() => setActive(leader)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(leader)}
                style={{
                  default: { cursor: "pointer", outline: "none" },
                  hover: { cursor: "pointer", outline: "none" },
                  pressed: { outline: "none" },
                }}
              >
                {isActive && (
                  <circle
                    cx={0}
                    cy={0}
                    r={6}
                    fill="none"
                    stroke={RED}
                    strokeWidth={2}
                    opacity={0.7}
                  >
                    <animate
                      attributeName="r"
                      from="6"
                      to="22"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.7"
                      to="0"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <g
                  transform={`translate(-12, -36) scale(${scale})`}
                  style={{ transition: "transform 0.15s ease" }}
                >
                  <path
                    d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 24 12 24s12-15.6 12-24c0-6.6-5.4-12-12-12z"
                    fill={RED}
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                  <circle cx={12} cy={12} r={4} fill="#fff" />
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Desktop floating tooltip anchored to pin */}
        {active && tooltipPos && (
          <div
            className="pointer-events-auto absolute z-10 hidden -translate-x-1/2 -translate-y-full md:block"
            style={{
              left: tooltipPos.left,
              top: tooltipPos.top - 18,
            }}
            onMouseEnter={() => setActive(active)}
            onMouseLeave={() => setActive(null)}
          >
            <LeaderTooltipCard
              leader={active}
              onSelectLeader={onSelectLeader}
              withCaret
            />
          </div>
        )}
      </div>

      {/* Mobile inline card below the map */}
      <div className="mt-6 md:hidden">
        {active ? (
          <LeaderTooltipCard
            leader={active}
            onSelectLeader={onSelectLeader}
          />
        ) : (
          <p className="text-center text-[15px] text-black/60">
            Tap a pin to see a leader
          </p>
        )}
      </div>
    </div>
  );
}

function LeaderTooltipCard({
  leader,
  onSelectLeader,
  withCaret = false,
}: {
  leader: Leader;
  onSelectLeader?: (leader: Leader) => void;
  withCaret?: boolean;
}) {
  return (
    <div className="relative">
      <div
        className="flex w-[240px] flex-col items-center rounded-[14px] border-[2px] bg-white p-4 text-center shadow-lg"
        style={{ borderColor: BLUE }}
      >
        <div className="h-[88px] w-[88px] overflow-hidden rounded-full bg-white">
          {leader.image ? (
            <div className="relative h-full w-full">
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-full text-2xl font-bold"
              style={{ color: BLUE, backgroundColor: LIGHT_BLUE }}
            >
              {leader.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>
          )}
        </div>

        <h4 className="mt-3 text-[17px] font-semibold leading-tight">
          {leader.name}
        </h4>
        <p className="mt-0.5 text-[14px] text-black">{leader.title}</p>
        <p className="mt-0.5 text-[13px] text-black/60">{leader.location}</p>

        {onSelectLeader && (
          <button
            type="button"
            onClick={() => onSelectLeader(leader)}
            className="mt-3 inline-flex items-center justify-center rounded-full border-[2px] px-3 py-1 text-[12px] font-bold leading-none tracking-[0.1em] text-white"
            style={{
              backgroundColor: BLUE,
              borderColor: "white",
              outline: `2px solid ${BLUE}`,
            }}
          >
            VIEW DETAILS
          </button>
        )}
      </div>

      {withCaret && (
        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-[2px] border-r-[2px] bg-white"
          style={{ bottom: -7, borderColor: BLUE }}
        />
      )}
    </div>
  );
}

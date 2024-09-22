import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop" | undefined;

export const useDeviceDetection = () => {
  const [device, setDevice] = useState<DeviceType>();

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice("mobile");
      } else if (isTablet) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleDeviceDetection();
  }, []);

  return device;
};

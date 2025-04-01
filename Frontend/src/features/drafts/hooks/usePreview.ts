import { useQuery } from "@tanstack/react-query";
import { previewDraftService } from "@/services/api/draftApiServices";
import { useState } from "react";

type DeviceType = "laptop" | "mobile";

export const usePreview = (id: string) => {
    const [device, setDevice] = useState<DeviceType>("laptop");
    const handleDeviceChange = (deviceType: DeviceType) => {
      setDevice(deviceType);
    };
    
    const {
      data: DraftPreview,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["previewDraft", id], // Unique key for the query
      queryFn: async () => await previewDraftService(id!),
      refetchOnWindowFocus: false,
      enabled: !!id,
      staleTime: 1000 * 60 * 10, // 5 minutes
      gcTime: 1000 * 60 * 10, // 5 minutes
    });

    return {
      DraftPreview,
      isLoading,
      isError,
      device,
      handleDeviceChange,
    };
}


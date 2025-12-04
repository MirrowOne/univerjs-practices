import { useEffect } from "react";
import type { IEventParamConfig } from "@univerjs/presets";
import { useUniverAPI } from "@/src/store/univerStore";

/**
 * Hook para suscribirse a un evento de Univer.
 * Limpia la suscripción automáticamente al desmontar el componente o cambiar dependencias.
 *
 * @param event Nombre del evento (clave de IEventParamConfig)
 * @param callback Callback a ejecutar cuando se dispara el evento
 */

export function useUniverEvent<K extends keyof IEventParamConfig>(
  event: K,
  callback: (payload: IEventParamConfig[K]) => void
) {
  const univerAPI = useUniverAPI();

  useEffect(() => {
    if (!univerAPI) return;
    const disposable = univerAPI.addEvent(event, callback);
    return () => {
      disposable?.dispose?.();
    };
  }, [univerAPI, event, callback]);
}

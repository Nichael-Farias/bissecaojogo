
// No changes needed, this is just to make sure the hook is properly defined
import { useState, useCallback, useEffect } from "react";
import { toast } from "../components/ui/sonner";

export { toast };

export function useToast() {
  return {
    toast
  }
}

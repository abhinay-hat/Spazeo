import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useAI() {
  const analyzeScene = useAction(api.ai.analyzeScene)
  const generateDescription = useAction(api.ai.generateDescription)

  return { analyzeScene, generateDescription }
}

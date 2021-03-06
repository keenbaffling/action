import {IRetroReflectionGroup} from 'universal/types/graphql'

const mapGroupsToStages = (reflectionGroups: Array<IRetroReflectionGroup>) => {
  const importantReflectionGroups = reflectionGroups.filter((group) => group.voterIds.length > 0)
  // handle edge case that no one votes
  if (importantReflectionGroups.length === 0) return reflectionGroups
  importantReflectionGroups.sort((a, b) => (a.voterIds.length < b.voterIds.length ? 1 : -1))
  return importantReflectionGroups
}

export default mapGroupsToStages

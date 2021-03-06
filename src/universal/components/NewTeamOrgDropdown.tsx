import React from 'react'
import MenuWithShortcuts from 'universal/components/MenuWithShortcuts'
import {PRO} from 'universal/utils/constants'
import TagPro from 'universal/components/Tag/TagPro'
import MenuItemWithShortcuts from 'universal/components/MenuItemWithShortcuts'
import DropdownMenuLabel from 'universal/components/DropdownMenuLabel'
import DropdownMenuItemLabel from 'universal/components/DropdownMenuItemLabel'
import {createFragmentContainer, graphql} from 'react-relay'
import {NewTeamOrgDropdown_organizations} from '__generated__/NewTeamOrgDropdown_organizations.graphql'

interface Props {
  closePortal: () => void
  defaultActiveIdx: number
  onChange: (orgId: string) => void
  organizations: NewTeamOrgDropdown_organizations
}

const NewTeamOrgDropdown = (props: Props) => {
  const {defaultActiveIdx, onChange, organizations, closePortal} = props
  console.log('active idx', defaultActiveIdx)
  return (
    <MenuWithShortcuts
      ariaLabel={'Select the organization the new team belongs to'}
      closePortal={closePortal}
      defaultActiveIdx={defaultActiveIdx + 1}
    >
      <DropdownMenuLabel notMenuItem>Select Organization:</DropdownMenuLabel>
      {organizations.map((anOrg) => {
        return (
          <MenuItemWithShortcuts
            key={anOrg.id}
            label={
              <DropdownMenuItemLabel>
                <span>{anOrg.name}</span>
                {anOrg.tier === PRO && <TagPro />}
              </DropdownMenuItemLabel>
            }
            onClick={() => {
              onChange(anOrg.id)
            }}
          />
        )
      })}
    </MenuWithShortcuts>
  )
}

export default createFragmentContainer(
  NewTeamOrgDropdown,
  graphql`
    fragment NewTeamOrgDropdown_organizations on Organization @relay(plural: true) {
      id
      name
      tier
    }
  `
)

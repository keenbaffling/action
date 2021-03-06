import {LeaveTeamModal_teamMember} from '__generated__/LeaveTeamModal_teamMember.graphql'
import React from 'react'
import styled from 'react-emotion'
import {createFragmentContainer, graphql} from 'react-relay'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import PrimaryButton from 'universal/components/PrimaryButton'
import IconLabel from 'universal/components/IconLabel'
import DialogHeading from 'universal/components/DialogHeading'
import DialogContent from 'universal/components/DialogContent'
import withAtmosphere, {
  WithAtmosphereProps
} from 'universal/decorators/withAtmosphere/withAtmosphere'
import RemoveTeamMemberMutation from 'universal/mutations/RemoveTeamMemberMutation'
import TeamManagementModalBoundary from '../PromoteTeamMemberModal/TeamManagementModalBoundary'

const StyledModalBoundary = styled(TeamManagementModalBoundary)({
  width: 356
})

const StyledButton = styled(PrimaryButton)({
  margin: '1.5rem auto 0'
})

interface Props extends WithAtmosphereProps, RouteComponentProps<{}> {
  teamMember: LeaveTeamModal_teamMember
  closePortal: () => void
}

const LeaveTeamModal = (props: Props) => {
  const {atmosphere, closePortal, history, teamMember} = props
  const {teamMemberId} = teamMember
  const handleClick = () => {
    history.push('/me')
    closePortal()
    RemoveTeamMemberMutation(atmosphere, teamMemberId)
  }
  return (
    <StyledModalBoundary>
      <DialogHeading>{'Are you sure?'}</DialogHeading>
      <DialogContent>
        {'This will remove you from the team.'}
        <br />
        {'All of your tasks will be given to the team lead.'}
        <StyledButton size='medium' onClick={handleClick}>
          <IconLabel icon='arrow_forward' iconAfter label='Leave the team' />
        </StyledButton>
      </DialogContent>
    </StyledModalBoundary>
  )
}

export default createFragmentContainer(
  withAtmosphere(withRouter(LeaveTeamModal)),
  graphql`
    fragment LeaveTeamModal_teamMember on TeamMember {
      teamMemberId: id
    }
  `
)

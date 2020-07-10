import React, { useContext } from 'react'
import { useQuery, useLazyQuery } from 'react-apollo'
import { MY_NOTIFICATIONS_QUERY } from 'constants/user'
import { AuthContext } from 'contexts/auth'

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, NavLink, Spinner, CardText, Card } from 'reactstrap'

const Notifications = () => {
  const authContext = useContext(AuthContext)
  const { data, loading, error } = useQuery(MY_NOTIFICATIONS_QUERY)
  console.log(data)

  if (loading) return <Spinner />
  if (error) return <p>Error</p>

  return (
    <>
      <DropdownToggle caret color="default" data-toggle="dropdown" nav>
        {authContext.user.unreadNotificationsCount > 0 && <div className="notification d-none d-lg-block d-xl-block" />}
        <i className="tim-icons icon-sound-wave" />
        <p className="d-lg-none">Notifications</p>
      </DropdownToggle>
      <DropdownMenu className="dropdown-navbar" right tag="ul">
        <Card className="m-0">
          {data?.myNotifications &&
            (data.myNotifications.length !== 0 ? (
              data.myNotifications.map((noti) => (
                <NavLink key={noti.id} tag="li" href={noti.data.url}>
                  <DropdownItem className="nav-item" active={!noti.is_read}>
                    <CardText>{noti.data.message}</CardText>
                    {noti.created_at}
                  </DropdownItem>
                </NavLink>
              ))
            ) : (
              <NavLink tag="li">
                <DropdownItem className="nav-item">No notification yet!</DropdownItem>
              </NavLink>
            ))}
        </Card>
      </DropdownMenu>
    </>
  )
}

export default Notifications

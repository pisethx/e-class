export const selectable = (_users) => {
  if (!_users || !_users.length) return

  return _users.map((user) => ({
    value: user?.id,
    label: `${user?.identity?.first_name} ${user?.identity?.last_name}`,
  }))
}

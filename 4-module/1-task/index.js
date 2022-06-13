function makeFriendsList(friends) {
  let friendsList = document.createElement('ul')
  friends.forEach(friend => {
    friendsList.insertAdjacentHTML('beforeend', `<li>${friend.firstName} ${friend.lastName}</li>`)
  })
  return friendsList
}

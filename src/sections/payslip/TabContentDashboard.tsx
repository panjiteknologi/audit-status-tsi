const TabContentDashboard = () => {
  const data = [{
    title: "Ayu"
  }, {
    title: "Ayu2"
  },{
    title: "Ayu3"
  }]
  return (
    <div>
      {data?.map((item) => (
        <p>{item?.title}</p>
      ))}
    </div>
  )
}

export default TabContentDashboard
import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";

function GeoDataTable(props) {

  // props.eventsDaily.forEach(elem => {
  //   for(let i = 0; i <  props.eventsDaily.length; i++) {
  //     if(props.statsDaily[i].date === elem.date) {
  //       props.statsDaily[i].events = elem.events;
  //     }
  //   }
  // })

  // let dataList = props.statsDaily.map(elem => {
  //   return {
  //     ...elem,
  //     date: elem.date.substring(0, 10),
  //      //round up to 2 decimals
  //     revenue: Number(elem.revenue).toFixed(2)
  //   }
  // });

  // console.log('dataList: ', dataList);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <div style = {{ color: "#940031",
                            backgroundColor: '#e8eaf5',
                            fontWeight: 'bold'
                         }}
            >
              <MTableToolbar {...props}/>
            </div>
          )
        }}
        options={{
          pageSize: 5,
          search: true,
          padding: 'dense',
          headerStyle:{ color :'#940031', fontWeight: 'bold' }
        }}
        columns={[
          { title: "Name", field: "name", cellStyle:{ padding: '10px'} },
          { title: "Impressions", field: "impressions" },
          { title: "Revenue", field: "revenue" },
          { title: "Clicks", field: "clicks" },
          { title: "Events", field: "events" },
        ]}
        data={[]}
        title="POI Data"
      />
    </div>
  );
}

export default GeoDataTable;
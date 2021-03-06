import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'

/**
 * GeoDataTable - functional React component which displays the data table on the map page.
 * @param {Object} props - array of objects containing locations and data associated with them.
 * @return {Array<any>} - React component containing a table with locations and related data.
 */
const GeoDataTable = ({ poiData }) => {
  /**
   * createDataArray - prepares data array to display in the map table.
   * @param {Array<any>} - data array from database with locations and related data.
   * @return {Array<any>} - processed data array to display in the table on the map page.
   */
  const createDataArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].impressions = Number(array[i].impressions)
      array[i].revenue = Number(array[i].revenue).toFixed(2)
      array[i].clicks = Number(array[i].clicks)
      array[i].events = Number(array[i].events)
    }
    return array
  }

  // array with data passed to table.
  const poiTableData = createDataArray(poiData)

  return (
    <div style={{ maxWidth: '100%', marginTop: '10px' }}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <div style = {{
              color: 'rgb(232, 234, 245)',
              backgroundColor: '#FF821D',
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
          headerStyle: { color: '#940031', fontWeight: 'bold' }
        }}
        columns={[
          { title: 'Location', field: 'name', cellStyle: { padding: '10px' } },
          { title: 'Impressions', field: 'impressions' },
          { title: 'Revenue', field: 'revenue' },
          { title: 'Clicks', field: 'clicks' },
          { title: 'Events', field: 'events' }
        ]}
        data={poiTableData}
        title='POI Data'
      />
    </div>
  )
}

export default GeoDataTable

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import fetch from 'isomorphic-fetch';

const beers = [
  {
    id: '1',
    name: 'Pilsner',
    minimumTemperature: 4,
    maximumTemperature: 6,
  },
  {
    id: '2',
    name: 'IPA',
    minimumTemperature: 5,
    maximumTemperature: 6,
  },
  {
    id: '3',
    name: 'Lager',
    minimumTemperature: 4,
    maximumTemperature: 7,
  },
  {
    id: '4',
    name: 'Stout',
    minimumTemperature: 6,
    maximumTemperature: 8,
  },
  {
    id: '5',
    name: 'Wheat beer',
    minimumTemperature: 3,
    maximumTemperature: 5,
  },
  {
    id: '6',
    name: 'Pale Ale',
    minimumTemperature: 4,
    maximumTemperature: 6,
  },
];

export default App = () => {
  const [products, setProducts] = useState({});

  const getData = () => {

    beers.forEach((product) => {
      fetch(`http://localhost:8081/temperature/${product.id}`)
        .then((response) => response.json())
        .then((response) =>
          setProducts((prevItems) => ({
            ...prevItems,
            [product.id]: {
              ...product, ...response,
            },
          }))
        );
    });
  }

  useEffect(() => {
    setInterval(getData, 5000);
    getData();
  }, []);

  return (

    <View style={{
      flex: 1,
      paddingTop: 48,
      paddingLeft: 24,
      paddingBottom: 48,
      paddingRight: 24,
      justifyContent: 'center',
    }}>
      {
        (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>Beers</Text>

          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', maxHeight: 30 }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Name</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Temperature</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Status</Text></View>
          </View>
          {
            Object.keys(products).map((product) => (
              <>
                <View key={products[product].id} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', maxHeight: 30 }}>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{products[product].name}</Text></View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ textAlign: 'center' }}>{products[product].temperature}</Text></View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    {products[product].temperature < products[product].minimumTemperature && <Text style={{ textAlign: 'center' }}>Too low</Text>}
                    {products[product].temperature > products[product].minimumTemperature && <Text style={{ textAlign: 'center' }}>Too high</Text>}
                    {products[product].temperature <= products[product].minimumTemperature &&
                      products[product].temperature >= products[product].minimumTemperature && <Text style={{ textAlign: 'center' }}>All good</Text>}
                  </View>
                </View>
              </>
            ))
          }
        </View>
        )
      }
    </View>
  );
};

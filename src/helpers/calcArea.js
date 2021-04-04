export const calcArea = (locations) => {
  if (!locations.length) {
    return 0;
  }
  // minimo 3 puntos
  if (locations.length < 3) {
    return 0;
  }
  let radius = 6371000;

  const diameter = radius * 2;
  const circumference = diameter * Math.PI;
  const listY = [];
  const listX = [];
  const listArea = [];

  // calcular segmentos x e y en grados para cada punto
  const latitudeRef = locations[0].latitude;
  const longitudeRef = locations[0].longitude;
  for (let i = 1; i < locations.length; i++) {
    let latitude = locations[i].latitude;
    let longitude = locations[i].longitude;
    listY.push(calculateYSegment(latitudeRef, latitude, circumference));

    listX.push(
      calculateXSegment(longitudeRef, longitude, latitude, circumference)
    );
  }

  // calcular areas para cada triangulo
  for (let i = 1; i < listX.length; i++) {
    let x1 = listX[i - 1];
    let y1 = listY[i - 1];
    let x2 = listX[i];
    let y2 = listY[i];
    listArea.push(calculateAreaInSquareMeters(x1, x2, y1, y2));
  }

  // sumar las areas de todos los triangulos
  let areasSum = 0;
  listArea.forEach((area) => (areasSum = areasSum + area));

  // area en valor absoluto
  let areaCalc = Math.abs(areasSum);
  return areaCalc;
};

const calculateAreaInSquareMeters = (x1, x2, y1, y2) => {
  return (y1 * x2 - x1 * y2) / 2;
};

const calculateYSegment = (latitudeRef, latitude, circumference) => {
  return ((latitude - latitudeRef) * circumference) / 360.0;
};

const calculateXSegment = (
  longitudeRef,
  longitude,
  latitude,
  circumference
) => {
  return (
    ((longitude - longitudeRef) *
      circumference *
      Math.cos(latitude * (Math.PI / 180))) /
    360.0
  );
};

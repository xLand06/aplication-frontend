import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartBar, CChartLine, CChartDoughnut, CChart } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload, cilPeople } from '@coreui/icons';
import { getStyle } from '@coreui/utils';

const ChartLineExample = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current;
      if (chartInstance) {
        const { options } = chartInstance;

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color');
        }

        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color');
          }
        }

        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color');
          }
        }

        chartInstance.update();
      }
    };

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange);

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange);
    };
  }, []);

  
  return <CChart type="line" data={data} options={options} ref={chartRef} />;
};

const ChartDoughnutAndPieExample = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current;
      if (chartInstance) {
        const { options } = chartInstance;

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color');
        }

        chartInstance.update();
      }
    };

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange);

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange);
    };
  }, []);

  const data = {
    labels: ['Bateria', 'Puerto de Carga', 'Pantalla', ''],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  };

  return <CChart type="doughnut" data={data} options={options} ref={chartRef} />;
};

const Dashboard = () => {
  // Simulación de datos
  const repairsByBrandData = [
    { brand: 'Apple', count: 30 },
    { brand: 'Samsung', count: 25 },
    { brand: 'Huawei', count: 15 },
    { brand: 'Xiaomi', count: 10 },
    { brand: 'Tecno', count: 30 },
    { brand: 'Otros', count: 20 },
  ];

  const repairsTrendData = [
    { date: 'Enero', count: 20 },
    { date: 'Febrero', count: 30 },
    { date: 'Marzo', count: 25 },
    { date: 'Abril', count: 40 },
    { date: 'Mayo', count: 35 },
    { date: 'Junio', count: 50 },
    { date: 'Julio', count: 45 },
  ];

  const pendingRepairs = 15;
  const completedRepairs = 85;

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Reparaciones por Marca
              </h4>
            </CCol>
          </CRow>
          <CChartBar
            data={{
              labels: repairsByBrandData.map(item => item.brand),
              datasets: [
                {
                  label: 'Reparaciones',
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  data: repairsByBrandData.map(item => item.count),
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="trend" className="card-title mb-0"></h4>
              <h4 id="trend" className="card-title mb-0">
                Tendencias de Reparaciones
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            data={{
              labels: repairsTrendData.map(item => item.date),
              datasets: [
                {
                  label: 'Reparaciones Mensuales',
                  backgroundColor: 'rgba(0, 217, 255, 0.6)',
                  borderColor: 'rgba(0, 217, 255, 0.6)',
                  data: repairsTrendData.map(item => item.count),
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="distribution" className="card-title mb-0">
                Distribución de Tipos de Reparaciones
              </h4>
            </CCol>
          </CRow>
          <ChartDoughnutAndPieExample />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="pending-completed" className="card-title mb-0">
                Reparaciones Pendientes vs Completadas
              </h4>
            </CCol>
          </CRow>
          <CChartBar
            data={{
              labels: ['Pendientes', 'Completadas'],
              datasets: [
                {
                  label: 'Reparaciones',
                  backgroundColor: ['#FF6384', '#36A2EB'],
                  data: [pendingRepairs, completedRepairs],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      {/* Nuevo gráfico agregado */}
      
    </>
  );
};

export default Dashboard;
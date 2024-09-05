import { Component, OnInit, inject } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import Swal from 'sweetalert2';
import { Chart, registerables } from 'chart.js';
import { VendasMensais } from '../../models/vendas-mensais';
Chart.register(...registerables);


@Component({
  selector: 'app-grafico-vendas-dash',
  standalone: true,
  imports: [],
  templateUrl: './grafico-vendas-dash.component.html',
  styleUrl: './grafico-vendas-dash.component.scss'
})


export class GraficoVendasDashComponent implements OnInit{

  lista: VendasMensais[] = [];
  valorVenda: number[] = [];
  dataVenda: string[] = [];
  
  listAll(){
    this.carrinhoService.ListVendasByMonthForLast12Months().subscribe({
      next: lista => {
        this.lista = lista;
        console.log('Lista fetched:', this.lista);
        this.chartdata();
      },
      error: erro => {
        Swal.fire({
          title: "ERRO",
          text: "Ocorreu um erro inesperado",
          icon: "error",
          confirmButtonText: 'OK',
        });
      }
    });
  }
 
  constructor(private carrinhoService: CarrinhoService) {}

  chartdata(){
    if(this.lista){
      this.lista.map(o=>{
        this.valorVenda.push(o.valorTotal);
        this.dataVenda.push(o.mes);
      })
       // Debugging: log valorVenda
      console.log('ValorVenda:', this.valorVenda);
      this.renderChart(this.valorVenda, this.dataVenda);
    }else {
      console.log('Lista is empty, skipping chart rendering');
    }
  }

  ngOnInit(): void{
    this.listAll();
  }

  renderChart(valorVenda: number[], dataVenda: string[]){
    const barchar = new Chart('barchart', {
      type: 'bar',
      data:{
        labels: dataVenda,
        datasets: [
          {
            label: 'Total de Vendas',
            data: valorVenda,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ]

      },
      options:{
        scales: {
          x: {
            title: {
              display: true,
              text: 'Datas de Venda'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valor de Vendas (R$)'
            }
          }
        }
      }
    });
  }
 

}

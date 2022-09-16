@extends('layout.main')
@section('title', 'Grafik')
@section('content')

<canvas id="myChart" width="400" height="400"></canvas>
@endsection
@section('js')
<script>
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: {!! json_encode($user) !!},
        datasets: [{
            label: 'Durasi per Detik',
            data: {!! json_encode($time) !!},
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
</script>
    @endsection

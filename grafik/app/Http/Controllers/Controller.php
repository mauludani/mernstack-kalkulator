<?php

namespace App\Http\Controllers;

use App\Models\Times;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function index()
    {
        $times = Times::get();
        $username = [];
        $time = [];
        for ($i=0; $i < count($times); $i++) {
            if ($times[$i]['signin'] && $times[$i]['logout']) {
                $times[$i]['masuk'] = $times[$i]['signin']->toDateTime()->format("Y-m-d H:i:s");
                $times[$i]['keluar'] = $times[$i]['logout']->toDateTime()->format("Y-m-d H:i:s");
                $begin = Carbon::createFromFormat('Y-m-d H:i:s', $times[$i]['masuk']);
                $times[$i]['selisih'] = Carbon::createFromFormat('Y-m-d H:i:s', $times[$i]['keluar'])->diff($begin)->s;
                array_push($username, $times[$i]->username);
                array_push($time, $times[$i]['selisih']);
            } else {
                array_push($username, $times[$i]->username." Belum Logout");
                array_push($time, "0");
            }
        }
        // return $times;
        $data = [
            'user' => $username,
            'time' => $time
        ];
        // return $data;
        return view('index', $data);
    }
}
